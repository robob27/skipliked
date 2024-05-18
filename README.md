## skipliked

### What is it?

A simple browser extension to automatically skip liked videos on YouTube with a configurable delay. The extension only checks for liked videos when navigation occurs within YouTube, not on initial page load. This is to prevent the extension from skipping a liked video that you intentionally opened from an external link and want to watch. Unfortunately the extension can't discern between autoplaying a liked video vs intentionally clicking on a liked video within YouTube, so it will offer you an opportunity to not skip the video if you want to watch it by clicking the "Don't Skip" button that appears on the top left corner of the page.

The extension includes an options page which allows you to configure:
- the delay between navigation and checking if the video is liked (default 3000 milliseconds)
- the delay between checking if the video is liked and skipping the video (default 5000 milliseconds)

### Why?

YouTube autoplays my liked videos at me far too often. It's annoying to manually skip them every time, and I don't want to dislike videos just to prevent them from autoplaying.

### Installation

The extension is not currently signed, so you will need to install it manually. To do this, download the source code, zip it and then load the extension from the zip file in your browser. So far the extension has only been tested in Firefox, but it should work in Chrome as well.
