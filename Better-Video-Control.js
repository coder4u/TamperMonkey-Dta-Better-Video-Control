/ ==UserScript==
// @name Better Video Control
// @namespace http://tampermonkey.net/
// @version 2026-04-12
// @description try to take over the world!
// @author Coder
// @downloadURL https://raw.githubusercontent.com/coder4u/TamperMonkey-Dta-Better-Video-Control/refs/heads/main/Better-Video-Control.js
// @match https://delta.mil.gov.ua/vezha/crew/*
// @match https://delta.mil.gov.ua/vezha/sa/*
// @icon https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://videojs.org&size=64
// @grant none
// ==/UserScript==

(function() {
'use strict';
const getVideoTag = () => document.querySelector('*[data-testid=StreamElement] video');
document.addEventListener('keyup', function (e) {
    const videoTag = getVideoTag();

    if (videoTag) {
        const currentSpeed = videoTag.playbackRate;
        const maxPosibleSpeed = 15;
        const isTargetNotInput = !e.target.matches('input, textarea, select');
        let newSpeed = null;

        if (isTargetNotInput) {
            if (!isNaN(parseInt(e.key))) {
                newSpeed = parseInt(e.key);
            }

            if ((e.key === '=' || e.key === '+') && !e.shiftKey) {
                newSpeed = parseInt(currentSpeed < maxPosibleSpeed ? currentSpeed + 1 : maxPosibleSpeed);
            }

            if (e.key === '-' && !e.shiftKey) {
                newSpeed = currentSpeed >= 1 ? currentSpeed - 1 : currentSpeed;
            }

            if (e.key === '*') {
                newSpeed = maxPosibleSpeed;
            }

            if (newSpeed !== null) {
                console.log('video playback rate changed to:', newSpeed);

                videoTag.playbackRate = newSpeed === 0 ? 0.5 : newSpeed;
            }
        }
    }
})

document.addEventListener('wheel', function(e) {
    const videoTag = getVideoTag();
    const currentSpeed = videoTag.playbackRate;

    if (e.target === videoTag) {
        const currentTime = videoTag.currentTime;
        const deltaNormalized = e.deltaY / 100; // convert to 1 or -1, by default 100 and -100

        videoTag.currentTime = currentTime + deltaNormalized * currentSpeed;
    }
})
