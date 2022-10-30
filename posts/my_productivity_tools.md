---
title: My productivity tools
description: Software and a bit of hardware gems I found during 20+ years of sharpening the "[[Second brain]]" blade
date: 2022-10-30
tags:
  - productivity
layout: layouts/post.njk
image: https://cdn.pixabay.com/photo/2020/08/30/20/54/rice-field-5530707_1280.jpg
---

I like to make my everyday work and life-related tasks faster: taking notes, remembering passwords, arranging windows and maintain things to do. 
I want to share software and a bit of hardware gems I found during 20+ years of sharpening the "[[Second brain]]" blade. For me, it's also an opportunity to reflect.

> Most of the time, I use Apple devices and very little — Windows, so keep this in mind, and I'll try to highlight if there is a Windows version of the software.

## TLDR
* Remember things:
	* Apple Reminder
	* Apple Notes
	* Google Calendar
	* MacPass
* Personal Knowledge Management:
	* Notion
	* Obsidian
	* LucidChart
* System control:
	* Raycast
	* Lunar
	* ITerm 2
* Other
	* Keyboards: NuPhy Air 60 and Dygma Raise
	* Yandex.Disk
	* Timeout
	* Grammarly


## Remember things
* **Apple Reminder**
	* Using reminders as is. I often use Siri to create a reminder like "Hey Siri, remind me in 5 hours to scan a document". A cool benefit of the highly-coupled Apple eco-system.
	* Also using it to keep lists of:
		* Books to read
		* Movies to watch
		* Games to play
	* Platforms: macOS, iPadOS, iOS.
	* ![...](/img/for_posts/01/reminder.png)
* **Apple Notes**
	* Mostly using it for Quick Notes (TM). Again thanks to good integration with iOS and macOS, it's quite a convenient way to quickly write down a thought or save a link with comments. For instance, when exploring Unreal Engine 5, I often clicked on "Share" in the iOS YouTube app, shared the video via Notes, and added a small comment on what this video was about.
	* Sometimes, use it to draw some diagrams. Good enough for a rough sketch but hardly for sharing the result with someone else. Or I suck at drawing :)
	* I tried to use it as a main note-taking app, but it lacks many must-have features. Number one is interlinking between notes. On the good side, Apple started investing in it and recently, Apple added must-have things like tags or tables.
	* Platforms: macOS, iPadOS, iOS.
	* ![...](/img/for_posts/01/notes.png)
* **[Bear](https://bear.app)**
	* Honorable mention. I'm not using it anymore because Apple Notes has become good enough for the same tasks. But still, it has one of the nicest UI and UX (user experience) I ever saw both desktop and mobile. It's still worth trying if Apple Notes already cover your needs, but you're looking for a bit more features like:
		* Natural markdown format for notes,
		* Notes interlinking (more on that later, but that's potentially a huge one!),
		* Themes!
	* Platforms: macOS, iPadOS, iOS.
	* ![...](/img/for_posts/01/bear.png)
* **Google Calendar added to Apple Calendar**
	* Besides covering obvious needs like adding doctor appointments, birthdays, etc. I made a shared calendar with my relatives and added events like joint trips.
	* Tried to use it as a weekly schedule (set exact wake-up time, breakfast, work, gym, etc.), but it never lifted off. Maybe it's just a little too much "productivity" for me :), but if YouTube "productivity" experts are not lying to make more content, this kind of "full-scheduled life" works for some people.
	* Platforms: macOS, iPadOS, iOS, but Google Calendar itself can be integrated almost to every mail/calendar app.
* **[MacPass](https://macpassapp.org)**
	* I use it to **store credentials** to services. I love it for open-source and using local files as a database. 
	* Database files are encrypted and stored in personal cloud storage.
	* There are a lot of more popular alternatives, but almost all of them are online services and engaging browser extension installation. Credentials are one of the most important pieces of a secure online presence, and I cannot afford to store them in 3rd party services, which can (theoretically) vanish the next day and take all my credentials with them.
	* Alternatives using the same database format are available on all platforms.
	* ![...](/img/for_posts/01/macpass.png)

## Personal Knowledge Management
Although Apple Notes and Reminders are also used for preserving some knowledge, they do not offer any suitable (for me) experience for:
* Keeping long-lasting information,
* Research and learning,
* Writing long formats like articles or posts,
* Exploring and finding connections between existing information,
* Sharing information.

And that's fine. Apple's apps are good at quick information capture (in terms of performance and smooth UX for common tasks), but not for things I mentioned above. I guess it's almost impossible to have everything in a single app. 🤷‍♂️

* **[Notion](https://www.notion.so)**
	* It's my primary app for capturing personal life-related info, i.e. tips for passing IELTS, physical exercises, medical information, learning materials, etc.
	* It has quite a simple way to share notes, which I'm using for sharing information with relatives.
	* It has a cool UI around managing its databases and presents it in several ways (tables, kanban, etc.). 
		* For instance was using it for gathering structured info about routers or notebooks before buying ones. Price, performance, average temperature, etc., are all important factors affecting buying decisions.
		* But truth be told, it could be more useful as advertised. At least I didn't find any other good scenarios for personal use. I tried keeping it in the database todo-list, but managing it took more time than giving a profit.
	* Pricing model is quite affordable. Free-tier also works (recently, they expanded it so you can have an unlimited number of notes).
	* Platforms: all.
	* ![notion](/img/for_posts/01/notion.png)
* **Obsidian**
	* It's a new tool in my belt. They recently released a 1.0.0. It has MacOS, iOS (both iPhone and iPad versions) and Windows versions.
	* I'm exploring ways of using it for research work and writing articles based on research. I guess it's just my habit from science days when I was gathering a lot of sources before doing anything and verifying that my work makes sense :)
	* There are several features which make Obisidian a much more suitable tool for research and long-format writing compared to Notion:
		* The major one is graph-like knowledge structuring support. Yes, you can put your notes in folders like Notion or Apple Notes, but that's not the main one. 
			* Evangelists of graph-based solutions (sometimes called "[[Zattelcasten]]") say that the natural way of thinking for our brain is a network of connections between pieces of information, not a hierarchical structure which Notion or Notes offer. 
			* Practically speaking, this feature is more about habit than technology. You can quickly add links to other notes and see information about back-links (notes which refer to current note). And that's it! So you can think of it as a swift and responsive personal Wikipedia.
			* The habit is creating links to essential entities in the text while you are typing or reading. That's easy when you get used to it. You need to type `[[` and start typing the term you're going to mention and see if there is an already existing note. If not, that's not a problem; leave it as a link. Obsidian will create an empty note for you, so next time will see at least that some pages refer to the corresponding note.
			* People also say that graph-representation of notes also helps to indent if hidden relationships between data which can be valuable.
			* Anyway. I have tried the tool briefly to say how it all works in practice. Will see. I like the concept so far.
		* The next one is that it's entirely local! So I can not worry about your data integrity to some degree. Also, it does search and linking very fast. And you get a natural offline mode (*cough-Notion-cough*) :)
		* It's based on a markdown format, making migration or co-using notes in other apps (like Logseq) easy.
		* There are several helpful community plugins like better UX for creating tables, managing tasks, making UX more like an outline app, etc.
		* Themes, lots of them! Notion and Apple Notes lack this feature.
		* Obisidian give the option to create **a daily note** and open it at the beginning of each day. At first, I didn't get the value of it, but now I realize that this default clean place for notes offers a smooth opportunity for any work/research-related notes. No need to spend brain energy to select a proper place for a new note. Just start typing a fresh idea, and later maybe you'll move it to the right place. People have [[a limited number of good choices made per day]], and this feature allows them to save one every day.
		* Notes can have custom properties, and some plugins allow to query these properties and generate nice tables, kanban tables, etc. Again I didn't find this helpful feature in Notion. Still, I like the idea of how it is naturally integrated into notes compared to Notion, where database entry is a different sort of data not related to the rest of the notes.
		* A cherry on top is a unique way of organizing multiple opened notes in the app — stacked view. It feels like real pieces of paper stacked on each other, and you slide them left and right to switch to the most useful now. Fantastic concept and I hope it will find more adoption in the future in other apps like Visual Studio Code or Web Browsers.
	* The only issue is a pricing model. 8$ per month (96$ per year) is too much for built-in cloud syncing, which is useful if you use the app on multiple devices. I'm using iCloud to store notes, which works great across Apple devices, but iCloud is not working in Windows. Also, 50$ per year for a commercial license with no additional features compared to a personal (free) license is a bit of a shame. Maybe after several months of the experiment, I will be convinced to buy a sync feature, though :)
	* Platforms: all.
	* ![](/img/for_posts/01/obisidian.png)
* **Lucidchart**
	* I used this app only for work since my employer provides a license for it. It's one of the best of its kind.
	* The power of diagrams in work life is a topic for another post. As a software engineer, I've been making diagrams since university, and it's an amazing process helping creativity, problem-solving and documenting.
	* Previously, I used open-sourced **Draw.io**, which is also great, but due to its open-source nature, it could be more advanced and polished and has a sharing capability.
	* Platforms: all.
	* ![...](/img/for_posts/01/lucidchart.png)

## System control
- **Raycast**
	- A recent gem I found. It's an extensible MacOS Spotlight (the one you see on "Cmd + Space"). 
	- It's quite the same as more mature [Alfred](https://www.alfredapp.com/), but we with much more in free-pack and a more modern (IMHO) look.
	- Previously, I used two different apps for the same functions: Spectacle (prev. Rectangle) for windows management and Clipy for clipboard history.
	- I use it for:
		- **Clipboard history**. That's the most frequent feature I use. I also stored images in history with previews and allowed them to paste without formatting.
		- Windows Management: move a window to the left-right half, move windows to another display, etc. Second the most frequent feature.
		- Opening floating (over everything) notes during the meeting to keep track of the agenda
		- Quick calculations.
	- Platforms: macOS.
	- ![...](/img/for_posts/01/raycast.png)
- **[Lunar](https://lunar.fyi)**
    - Allows controlling brightness both on built-in and external monitors.
    - Previously, I used 2 or 3 similar apps, some of them are open-source, but no app managed to work correctly with all the external monitors I use.
    - Platforms: macOS.
    - ![...](/img/for_posts/01/lunar.png)
    - 
- **ITerm 2**
	- Replacement for MacOS built-in terminal.
	- Has tons of features and integrations.
	- My current work only assumes a little work in a terminal, but I remember what a great difference it made when I started to use one at my previous job.
	- Platforms: macOS.

## Other
* Good keyboard and typing skills
	* Typing speed is not a help in programming, but the more senior engineer, the more time he can spend on communication, writing a post in a corporate network, documentation, etc. 
	* To make these tasks faster and more pleasant, I invested some time in typing speed skills and a keyboard with a comfortable typing experience.
	* Keyboard
		* Home: **NuPhy Air 60**. It's 60% (no Numpad and Fn row), mechanical, low-profile And wireless keyboard. I love its compact size and folio, allowing me to put my iPad mini on a stand. I read and write many things on iPad (including this post), and this keyboard is way better than Apple's offerings for the same tasks in terms of balance between portability and typing experience. I use linear lubed switches with some mods.
			* ![...](/img/for_posts/01/nuphy.png)
		* Work: **Dygma Raise**. It's a 60% split ergonomic mechanical keyboard with optional tenting capability for a more ergonomic wrist position. I love it for the comfort of typing. One small con is that the sound of typing could be better due to its construction. I use linear lubed switches + some keyboard mods.
			* ![...](/img/for_posts/01/dygma.png)
* **Cloud Storage**
	- One of the oldest categories of apps I use. Currently, I use [Yandex.Disk](https://disk.yandex.com) because of stable MacOS app work and reliable back-end. I worked for Yandex for seven years and knew the people behind the product. I can trust them :)
	- Available on all platforms.
	- Platforms: all.
- **[Timeout](https://apps.apple.com/us/app/time-out-break-reminders/id402592703?mt=12)** app from macOS App Store
	* Small nice app that reminds me to take a break. I have used it for at least six years.
	* Platforms: macOS.
* **[Grammarly](https://app.grammarly.com)**
	* It's a nice service checking grammar, spelling, punctuation and most importantly word selection and sentence structure.
	* Platforms: all.


## Conclusion
I was developing this set of apps and techniques for a long time, and the journey continues. It seems like a lot, but in reality, almost every app has some predecessors (which I also used) and extends previous experience, so it's pretty easy to learn a new app.
I know the "productivity" apps field is indefinite, and I'm happy to see you sharing your favourite apps and workflows.