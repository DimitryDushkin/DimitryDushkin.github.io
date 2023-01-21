---
title: Logseq task completion tracker plugin
description: Recently, I discovered Logseq*, a powerful tool for keeping track of tasks, notes, and more. As I began to explore its features, I realized that I could take my task management to the next level by automating the process of report generation.
date: 2022-21-01
tags:
  - productivity
  - task planning
layout: layouts/post.njk
image: /img/for_posts/man_walking_away/man_walking_away.jpg
---

One tool that I've found helpful in managing my workload is a **task list**. However, manually writing down what I've accomplished and what still needs to be done each week can be time-consuming and tedious.

Recently, I discovered **Logseq**, a powerful tool for keeping track of tasks, notes, and more. As I began to explore its features, I realized that I could take my task management to the next level by automating the process of report generation.

With this in mind, I set out to create a Logseq plugin that would automate the report generation of tasks done for a given period.

This plugin adds `completed:: <today>` property to task upon checking it. Also it adds **slash command** with a query **to get tasks done last week** : `Completed tasks for the past week`

* Github — https://github.com/DimitryDushkin/logseq-plugin-task-check-date
* The plugin is now available in the Logseq Marketplace. Look for "Task completion".
