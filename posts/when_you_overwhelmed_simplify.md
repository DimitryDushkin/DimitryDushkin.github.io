---
title: When You’re overwhelmed, simplify
description: Amazing article on art of task simplification by Nataliia. I like this kind of stories since they reflect the value of scientific approach in solving everyday tasks in programming
date: 2022-11-10
tags:
  - software engineering
layout: layouts/post.njk
image: /img/for_posts/03/viking.jpg
---

_by Nataliia Dushkina (https://github.com/indra-uolles)_

When I saw this phrase, I felt that somebody had crept into my head and was stealing thoughts out of it :D Seriously, it’s one of my main work principles that I try to follow.

Let me give an example of how to use this principle when you work as a front-end developer.

Not long ago, I was involved in large legacy project update tasks. Its current front-end framework version was 2, and we were going to promise that we’ll update it to 13 quickly enough.

There was a problem, though. Several people tried to do a proper update (like it’s advised in official docs) to the next version, but they encountered different weird bugs and got stuck. To understand these errors, one would have to be a real open-source ninja. The Update task was starting to seem impossible.

As a former scientist, I know that when there is a _BIG, UNKNOWN SMTH_, you have to find a small piece you can do and try to understand this by chewing off that little piece first. So I asked our team lead to give me a couple of days to test a minor jump update to version 5. He wasn’t happy about my suggestion, but since no one had better recommendations, he allowed me to do it.

The first thing I did was remove auth code from backend. I commented out some things and hardcoded others, so the backend would always think I’m a particular user who is logged in. Then I created a new project from a template with framework version 5 and started to restore a little feature by dragging little pieces of code from the old front-end.

Everybody kept telling me that it was ineffective and would take too much time to update the whole project this way. I kept saying it was just a little investigation which I’ll be ready to drop as soon as somebody found a better approach. After a couple of days, another developer joined me, though he was still sceptical about all these “pieces dragging”.

Guess what? After another couple of days doing this, he suddenly understood how this legacy app differs from a typical app created with such framework. Now he was able to jump update to version 5 all the codebase. He spent several days doing that and succeeded.

In other words, my piece of advice **is if you see something big you don’t know how to tackle, think about what little investigation you could do, even if deadlines are harsh.**
