# vue-mini-player

This is a simple mini player which is based on [petite-vue](https://github.com/vuejs/petite-vue)

## Features

- 18kb size (CSS + JS without petite-vue, gzip: 7.5kb).
- Base function with a simple audio list.
- Can move to page anywhere with mouse grab.
- Simply operate.

## Usage

Clone this repository and go to `release` folder, copy `.js` and `.css` file to your website folder.

Use them in your html page:

```html
<!-- .css file path -->
<link rel="stylesheet" href="./player/index.bundle.css">

<!-- petite-vue CDN -->
<script src="https://unpkg.com/petite-vue"></script>
<!-- .js file path -->
<script src="./player/index.bundle.js"></script>
```

Then you can find it appear on your page right bottom corner.

![](docs/1.jpg)

## Mode explain

### Play Song Mode

There are 4 mode to auto change song after audio ended.

- Continue play until last song. (Default)
- Loop all song.
- Loop current song.
- Play Randomly.

### Move the player

Mouse move to the song title and grab it. Then you can begin to move it.

![](docs/grab.gif)

Please read [API](#API) part to learn how to operate it.

## API

Update irregularly.

If you want to get all api information, Please go to `src/core/index.ts` to get it.

### Declaration

See details in `src/core/core.d.ts`

#### SingleSongBriefInfo

Base info with a single song.

| key    | type                  | explaination                                |
| ------ | --------------------- | ------------------------------------------- |
| name   | string                | Song name, will appear on song name area.   |
| id     | number                | Song id, use Object to collect.             |
| src    | string                | Song audio source.                          |
| author | string[] \| undefined | Song author.                                |
| album  | string \| undefined   | Song album.                                 |
| img    | string \| undefined   | Song thumbnail, will appear at player left. |


## Operate the core

### Get the player core

```js
const core = window._PlayerCore
```

### Add a song

This is an example to add a song, it can also append at head!

```js
const core = window._PlayerCore

core.AppendSongOnTail({
  name: 'Untitled World', 
  id: 2, 
  src: '',  // Your audio.
  img: ''   // Your thumbnail.
})
```

### Remove a song

In most of situation you can remove by song list button in the player. But also you can remove it by api:

```js
// remove by api
core.RemoveSong(0)
```

## License

MIT
