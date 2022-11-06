---
title: Principles of engineering excellence
description: Note summaries shaping of my understanding of generic engineering excellence principles
date: 2022-11-06
tags:
  - software engineering
layout: layouts/post.njk
image: /img/for_posts/other/medieval-craft-room-blueprints-dalle.jpeg
---

For the past 12 years of creating software for money, I started to sense the presence of **generic principles of engineering excellence**. This sense includes not only code decisions but also concepts around software development: collaboration, management, product evolvement and others. Violating these rules feels like "bad smells" mentioned in [["Refactoring" by Martin Fowler]] but more generically.

I plan to update this note from time to time because the "sense" mentioned above is blurry, and so is the interpretation.

## Core principles

- Engineering excellence is a process of **harnessing codebase chaos** by reducing an **entropy**
- Code should have a structure **simple for a fast high-level understanding**
- Logic is understandable from code and has no surprises, i.e. no hidden dependencies and unexpected side-effects

## Why

- Eventually, to **make a better product**!
- Keep a **good developer experience** tightly connected to a result.

## How

- **Reducing amount of code** by introducing re-usable modules
  - Make reusable code the best quality possible: it's fast, covers edge cases, and is fully specified by documentation and tests.
  - **Reusable code is s a foundation of a technical side of a product. This code includes libraries and frameworks.**
- **End-to-end (E2E) and unit-tests**
- **Knowledge sharing**: documentation (inc. good doc in E2E tests), internal talks, etc.

## Trade-offs

Engineering excellence is **not an ultimate goal** (see "Why"). These aspects of product development should be taken into consideration each time before investing time in engineering excellence:

- **Product maturity**
  - E.g. there is no sense in investing in own components library to build an MVP
- **Team maturity**
  - E.g. you'll likely create a good custom ORM if you delegate this task to a junior developer, at least in a reasonable amount of time.
- **Business reasons**
  - E.g. writing end-to-end tests for features which likely to be dropped.
