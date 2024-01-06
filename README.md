<p align="center">
  <img src="./assets/logo.png" alt="Compress Pics Logo" width="400"/>
</p>

[![GitHub License](https://img.shields.io/github/license/gaohaoyang/compress-pics?color=blue)](https://github.com/Gaohaoyang/compress-pics/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/compress-pics)](https://www.npmjs.com/package/compress-pics) [![GitHub issues](https://img.shields.io/github/issues/gaohaoyang/compress-pics)](https://github.com/Gaohaoyang/compress-pics/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/gaohaoyang/compress-pics)](https://github.com/Gaohaoyang/compress-pics/pulls)

A command-line tool that uses the tinyPNG API to compress images. It simplifies the process of batch compressing images with tinyPNG in any directory of your project.

Of course, you need to apply a tinyPNG API Key first, it's free.


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install](#install)
- [Usage](#usage)
- [Additional information](#additional-information)
  - [What if it show an error while compressing?](#what-if-it-show-an-error-while-compressing)
- [Contribution](#contribution)

<!-- /code_chunk_output -->



## Install

```bash
npm i compress-pics -D
```

or

```bash
yarn add compress-pics -D
```

## Usage

In your `package.json` file, add the following script:

```json
{
  "scripts": {
    "compress-pics": "compress-pics"
  }
}
```

Then run in your project directory:

```bash
npm run compress-pics
```

or

```bash
yarn compress-pics
```

Then, you will see the following prompt:

```
   ____                                                ____   _
  / ___| ___   _ __ ___   _ __   _ __  ___  ___  ___  |  _ \ (_)  ___  ___
 | |    / _ \ | '_ ` _ \ | '_ \ | '__|/ _ \/ __|/ __| | |_) || | / __|/ __|
 | |___| (_) || | | | | || |_) || |  |  __/\__ \\__ \ |  __/ | || (__ \__ \
  \____|\___/ |_| |_| |_|| .__/ |_|   \___||___/|___/ |_|    |_| \___||___/
                         |_|

? Select your images directory: (Use arrow keys or type to search)
❯ ./
  assets
  bin
  dist
  src
```

After selecting the image directory, you will see the following prompt:

```
? Select your images directory: assets
Your images directory is: assets
┌────────────────────────────┬───────┬──────────┬─────────────┐
│                            │ Count │ Size(MB) │ Size(Bytes) │
├────────────────────────────┼───────┼──────────┼─────────────┤
│ canBeCompressedPicFiles    │ 2     │ 0.19     │ 202319      │
├────────────────────────────┼───────┼──────────┼─────────────┤
│ cannotBeCompressedPicFiles │ 0     │ 0.00     │ 0           │
└────────────────────────────┴───────┴──────────┴─────────────┘
Notice: Gif and svg files cannot be compressed.
Total size(MB): 0.19MB
Total size(Bytes): 202319
? Please input a valid tinypng api key to continue ( You can find it at Tiny.com API ):
```

After entering the tinyPNG API Key, the compression will start automatically.

```
? Please input a valid tinypng api key to continue ( You can find it at Tiny.com API ):  YOUR_API_KEY_HERE
processing:  1 / 2 assets/continue.png
processing:  2 / 2 assets/logo.png
  _____  _         _       _                _
 |  ___|(_) _ __  (_) ___ | |__    ___   __| |
 | |_   | || '_ \ | |/ __|| '_ \  / _ \ / _` |
 |  _|  | || | | || |\__ \| | | ||  __/| (_| |
 |_|    |_||_| |_||_||___/|_| |_| \___| \__,_|

┌────────────────────────────┬───────┬──────────┬─────────────┐
│                            │ Count │ Size(MB) │ Size(Bytes) │
├────────────────────────────┼───────┼──────────┼─────────────┤
│ canBeCompressedPicFiles    │ 2     │ 0.06     │ 59916       │
├────────────────────────────┼───────┼──────────┼─────────────┤
│ cannotBeCompressedPicFiles │ 0     │ 0.00     │ 0           │
└────────────────────────────┴───────┴──────────┴─────────────┘
Notice: Gif and svg files cannot be compressed.
Total size(MB): 0.06MB
Total size(Bytes): 59916
================================================================================
The total size has decreased by 70.39% after compression.
```

## Additional information

### What if it show an error while compressing?

Most of the time, it's because you have exceeded the monthly limit of tinyPNG. You can use another API Key to continue. Like below:

```
processing:  72 / 123 src/images/payWays/master.png
processing:  73 / 123 src/images/payWays/p30_promo_banner_en.png
The error message is: Your monthly limit has been exceeded. (HTTP 429/TooManyRequests)
? Please input a valid tinypng api key to continue ( You can find at https://tinify.com/dashboard/api ):  YOUR_ANOTHER_API_KEY_HERE
processing:  73 / 123 src/images/payWays/p30_promo_banner_en.png
processing:  74 / 123 src/images/payWays/p30_promo_banner_zh.png
```

## Contribution

If you have any questions or suggestions, please feel free to open an [issue](https://github.com/Gaohaoyang/compress-pics/issues) or [pull request](https://github.com/Gaohaoyang/compress-pics/pulls).

Enjoy it! :smile:

Have a nice day!
