---
title: "Creating browser extension with ChatGPT as a main development driver (spoiler: it's a mess :))"
description: "Small experiment with ChatGPT as a development driver of a Chrome Extension that generates summaries (via GPT) for an article on the current webpage. Source code included."
date: 2023-03-26
tags:
  - gpt
  - large language model
  - javascript
layout: layouts/post.njk
image: /img/for_posts/gpt-toolbelt/gpt-toolbelt-blog-post-image.jpg
---

I decided to join a wave and write a simple browser extension relying on ChatGPT help. Extension uses GPT to make a summary for article on current page.
At first everything looked surprisingly smooth. GPT gave a complete file structure and contents for it. Wow!😲

![GPT response on initial request](/img/for_posts/gpt-toolbelt/gpt-response-0.png)

## Strike one - Old API

It was not working though, since it replaced with comments article's content extraction and also API calls. But It's fine.
After asking to use specific library for extraction (Readability.js) and specific OpenAI API for summarisation it produced at first sight quite worthy code. With one little issue -- it was not working. 🤷‍♂️ I asked how to debug an extension and started debugging.

First issue was that GPT suggested to use old (inexistent) OpenAI API. I googled for current one and modified code.

## Strike two - "forgot" about permissions to not used Chrome API

Secondly, it used `chrome.local.storage`, but forgot to set permissions for it in manifest.json. I showed GPT an error, GPT apologised and answered with correct instructions.

The funny thing is that storage is not used anyhow in the app! 🥲
I asked GPT "why do you need a storage anyway?".
GPT:
![GPT response on storage question](/img/for_posts/gpt-toolbelt/gpt-response-1.jpg)

Finally we at the stage of making correct API request without errors in JS!

## Strike three - incorerct API request params

But turned out it wasn't initially correctly calling API. I inspected API response and found that it returned empty `choices[0].text and choices[0].finish_reason === "length"`
![GPT response on API question](/img/for_posts/gpt-toolbelt/gpt-response-2.jpg)

Ok, so turned out max_tokens shouldn't be 0. Who would have thought...

## Forth miss - mess after multiple rewrites

Let's try again. Not working. Some problem in "background.js", it cannot read id from tab. Telling again the error and got a fixed version.
At last, behold the successfully functioning extension!
![Screenshot of working browser extension summarsing article](/img/for_posts/gpt-toolbelt/gpt-toolbelt-screenshot.jpeg)

The code can be improved by the way. For instance big articles can easily exceed input of used model (varies for different models). It's 1500 words for most models. And around 7000 for a few more expensive ones.

## Conclusion

It's really impressive if you know what's you doing! It helped me to skip boring steps of exploring Chrome Extension API (although I'm a bit familiar with it) and concentrate on interesting part -- working with GPT API.

But it produced buggy code. Looks like during single response it's not taking in account beginning of a response. Meaning that it produced valid `manifest.json` at first but while it was writing `background.js` and started using Storage API it "forgot" that permissions for it wasn't included in `manifest.json` in the first place.

Is it a fundamental flaw of LLM since it essentially an "autocomplete" or it's a limitation of current utilisation method? Will see :)

Extension's source code - https://github.com/DimitryDushkin/gpt-toolbelt
