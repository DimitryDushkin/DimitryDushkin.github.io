/**
 * Copyright (c) 2020 Google Inc
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { JSDOM } = require("jsdom");
const { promisify } = require("util");
const sizeOf = promisify(require("image-size"));
const blurryPlaceholder = require("./blurry-placeholder");
const srcset = require("./srcset");
const path = require("path");
const { gif2mp4 } = require("./video-gif");

/**
 * Sets `width` and `height` on each image, adds blurry placeholder
 * and generates a srcset if none present.
 * Note, that the static `sizes` string would need to change for a different
 * blog layout.
 */

const processImage = async (img, outputPath) => {
  let src = img.getAttribute("src");
  if (/^(https?\:\/\/|\/\/)/i.test(src)) {
    return;
  }
  if (/^\.+\//.test(src)) {
    // resolve relative URL
    src =
      "/" +
      path.relative("./_site/", path.resolve(path.dirname(outputPath), src));
    if (path.sep == "\\") {
      src = src.replace(/\\/g, "/");
    }
  }
  let dimensions;
  try {
    dimensions = await sizeOf(path.resolve(__dirname, `../_site/${src}`));
  } catch (e) {
    console.warn("imgdim", e.message);
    return;
  }
  if (!img.getAttribute("width")) {
    img.setAttribute("width", dimensions.width);
    img.setAttribute("height", dimensions.height);
  }
  const inputType = dimensions.type;
  if (inputType == "svg") {
    return;
  }
  if (inputType == "gif") {
    const videoSrc = await gif2mp4(src);
    const video = img.ownerDocument.createElement(
      /AMP/i.test(img.tagName) ? "amp-video" : "video"
    );
    [...img.attributes].map(({ name, value }) => {
      video.setAttribute(name, value);
    });
    video.src = videoSrc;
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    if (!video.getAttribute("aria-label")) {
      video.setAttribute("aria-label", img.getAttribute("alt"));
      video.removeAttribute("alt");
    }
    img.parentElement.replaceChild(video, img);
    return;
  }
  // When the input is a PNG, we keep the fallback image a PNG because JPEG does
  // not support transparency. However, we still optimize to AVIF/WEBP in a lossy
  // fashion. It may be worth adding a feature to opt-out of lossy optimization.
  const fallbackType = inputType == "png" ? "png" : "jpeg";
  if (img.tagName == "IMG") {
    img.setAttribute("decoding", "async");
    img.setAttribute("loading", "lazy");
    img.setAttribute(
      "style",
      `background-size:cover;` +
        `background-image:url("${await blurryPlaceholder(src)}")`
    );
    const doc = img.ownerDocument;
    const imgClass = img.getAttribute("class");
    const picture = doc.createElement("picture");
    const avif = doc.createElement("source");
    const webp = doc.createElement("source");
    const jpeg = doc.createElement("source");
    avif.setAttribute("class", imgClass);
    webp.setAttribute("class", imgClass);
    jpeg.setAttribute("class", imgClass);

    await setSrcset(avif, src, "avif");
    avif.setAttribute("type", "image/avif");
    await setSrcset(webp, src, "webp");
    webp.setAttribute("type", "image/webp");
    const fallback = await setSrcset(jpeg, src, fallbackType);
    jpeg.setAttribute("type", `image/${fallbackType}`);
    picture.appendChild(avif);
    picture.appendChild(webp);
    picture.appendChild(jpeg);
    img.parentElement.replaceChild(picture, img);
    picture.appendChild(img);
    img.setAttribute("src", fallback);
  } else if (!img.getAttribute("srcset")) {
    const fallback = await setSrcset(img, src, fallbackType);
    img.setAttribute("src", fallback);
  }
};

async function setSrcset(img, src, format) {
  const setInfo = await srcset(src, format);
  img.setAttribute("srcset", setInfo.srcset);
  // https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/
  // sizes tells how many pixel image will occupy in final layout, specifiying it helps to load image early before CSS processing
  // can be used with max-width to specify why size image will have with specific viewport size
  img.setAttribute(
    "sizes",
    img.getAttribute("class") === "post-list-img" // 'post-list-img' for list, otherwise for post
      ? "30vw"
      : "90vw"
  );
  return setInfo.fallback;
}

const dimImages = async (rawContent, outputPath) => {
  let content = rawContent;

  if (outputPath && outputPath.endsWith(".html")) {
    const dom = new JSDOM(content);
    const images = [...dom.window.document.querySelectorAll("img,amp-img")];

    if (images.length > 0) {
      await Promise.all(images.map((i) => processImage(i, outputPath)));
      content = dom.serialize();
    }
  }

  return content;
};

module.exports = {
  initArguments: {},
  configFunction: async (eleventyConfig, pluginOptions = {}) => {
    eleventyConfig.addTransform("imgDim", dimImages);
  },
};
