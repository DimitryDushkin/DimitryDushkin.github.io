const assert = require("assert").strict;
const expect = require("expect.js");
const { JSDOM } = require("jsdom");
const readFileSync = require("fs").readFileSync;
const existsSync = require("fs").existsSync;
const metadata = require("../_data/metadata.json");
const GA_ID = require("../_data/googleanalytics.js")();
const { parseHeaders } = require("../_11ty/apply-csp");

/**
 * These tests kind of suck and they are kind of useful.
 *
 * They suck, because they need to be changed when the hardcoded post changes.
 * They are useful because I tend to break the things they test all the time.
 */

describe("check build output for a generic post", () => {
  describe("sample post", () => {
    const POST_PATH = "/posts/firstpost/";
    const POST_FILENAME = `_site${POST_PATH}index.html`;
    const URL = metadata.url;
    const POST_URL = URL + POST_PATH;

    if (!existsSync(POST_FILENAME)) {
      it("WARNING skipping tests because POST_FILENAME does not exist", () => {});
      return;
    }

    let dom;
    let html;
    let doc;

    function select(selector, opt_attribute) {
      const element = doc.querySelector(selector);
      assert(element, "Expected to find: " + selector);
      if (opt_attribute) {
        return element.getAttribute(opt_attribute);
      }
      return element.textContent;
    }

    before(() => {
      html = readFileSync(POST_FILENAME);
      dom = new JSDOM(html);
      doc = dom.window.document;
    });


    it("should have inlined css", () => {
      const css = select("style");
      expect(css).to.match(/header nav/);
      expect(css).to.not.match(/test-dead-code-elimination-sentinel/);
    });

    it("should have script elements", () => {
      const scripts = doc.querySelectorAll("script[src]");
      let has_ga_id = GA_ID ? 1 : 0;
      expect(scripts).to.have.length(has_ga_id + 2); // NOTE: update this when adding more <script>
      expect(scripts[0].getAttribute("src")).to.match(
        /^\/js\/min\.js\?hash=\w+/
      );
    });

    it("should have GA a setup", () => {
      if (!GA_ID) {
        return;
      }
      const scripts = doc.querySelectorAll("script[src]");
      expect(scripts[1].getAttribute("src")).to.match(
        /^\/js\/cached\.js\?hash=\w+/
      );
      const noscript = doc.querySelectorAll("noscript");
      expect(noscript.length).to.be.greaterThan(0);
      let count = 0;
      for (let n of noscript) {
        if (n.textContent.includes("/api/ga")) {
          count++;
          expect(n.textContent).to.contain(GA_ID);
        }
      }
      expect(count).to.equal(1);
    });

    it("should have a good CSP", () => {
      assert(existsSync("./_site/_headers"), "_header exists");
      const headers = parseHeaders(
        readFileSync("./_site/_headers", { encoding: "utf-8" })
      );
      POST_PATH;
      expect(headers).to.have.key(POST_PATH);
      expect(headers).to.have.key(`${POST_PATH}index.html`);
    });

    it("should have accessible buttons", () => {
      const buttons = doc.querySelectorAll("button");
      for (let b of buttons) {
        expect(
          (b.firstElementChild === null && b.textContent.trim()) ||
            b.getAttribute("aria-label") != null
        ).to.be.true;
      }
    });

    it("should have a share widget", () => {
      expect(select("share-widget button", "href")).to.equal(POST_URL);
    });


    it("should link to twitter with noopener", () => {
      const twitterLinks = Array.from(doc.querySelectorAll("a")).filter((a) =>
        a.href.startsWith("https://twitter.com")
      );
      for (let a of twitterLinks) {
        expect(a.rel).to.contain("noopener");
        expect(a.target).to.equal("_blank");
      }
    });

    describe("body", () => {
     

      it("should have paragraphs", () => {
        const images = Array.from(doc.querySelectorAll("article > p"));
        expect(images.length).to.greaterThan(0);
      });
    });
  });
});
