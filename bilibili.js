const { perfectSubtitle } = require("./doubao");
const fs = require("fs");
const { createFileWithPath } = require("./utils.js");

exports.fetchBiliSubtitle = async (bvid) => {
  const {
    data: {
      aid,
      cid,
      title,
      owner: { name },
    },
  } = await fetch(
    `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
  const { data } = await fetch(
    `https://api.bilibili.com/x/player/v2?aid=${aid}&cid=${cid}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-US;q=0.6",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        cookie:
          "header_theme_version=CLOSE; CURRENT_BLACKGAP=0; buvid4=0AB028BC-3595-F2FE-64DF-1B4E0191E7A508541-023080618-ZuhD6dxC%2BOIGrr71yHriqw%3D%3D; buvid_fp_plain=undefined; enable_web_push=DISABLE; DedeUserID=354922193; DedeUserID__ckMd5=b6112e5ef321d162; FEED_LIVE_VERSION=V_WATCHLATER_PIP_WINDOW3; buvid3=70FECEA9-6DAF-DD79-0EBF-BDB46D6BE2A688144infoc; b_nut=1723107488; _uuid=7CAD4105B-713C-BE6F-B1910-DC1733318910F89101infoc; CURRENT_QUALITY=80; rpdid=|(u|JRkukRkR0J'u~klk~u~|~; hit-dyn-v2=1; CURRENT_FNVAL=4048; fingerprint=6c232a9308194d40a82be608a3122c62; PVID=1; buvid_fp=6c232a9308194d40a82be608a3122c62; OUTFOX_SEARCH_USER_ID_NCOO=360096520.65005505; SESSDATA=26eae48e%2C1745907836%2C179ca%2Aa2CjAFmjLMV8cA_kMhRj3wvhqL4qJWYLxG-OCW1s8O50mxrS0HXULyPscmk4rzycaRag8SVmktN3dwRjZvaXpqRThnQVB3ajhVWFhZZ1UzY3JCWENpRGFfNEIxemd3di1JWEJmdlByNHlIVW1LQ0JlVC04bS1HQzNkR3pCN0xhRUtfWmQ2a3BMTlZ3IIEC; bili_jct=d83826a2f0d185aaa0984b9d12e15e69; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzA2MTUwNDAsImlhdCI6MTczMDM1NTc4MCwicGx0IjotMX0.IO6dRIdenBSUUvvFHTzgLBf-XFrjNQXNtxQVP3RM-ac; bili_ticket_expires=1730614980; sid=4nbsvwqx; home_feed_column=5; browser_resolution=1920-1088; b_lsid=E826F129_192E1E38E0F; bp_t_offset_354922193=994410458033160192",
      },
      body: null,
      method: "GET",
    }
  ).then((res) => res.json());

  const url = data.subtitle.subtitles[0].subtitle_url;

  const { body } = await fetch(`https:${url}`, {
    method: "GET",
  }).then((res) => res.json());
  const subtitleList = [];
  let i = 0;
  body.forEach((element) => {
    if (subtitleList[i]) {
      if (subtitleList[i].length > 4000) {
        i += 1;
        subtitleList[i] = "";
      }
    } else {
      subtitleList[i] = "";
    }

    subtitleList[i] += " " + element.content;
  });

  let content = await serialLoopRequests(subtitleList);

  const path = `/Users/changqing/Desktop/subtitle/scripts/${name}/${title}.docx`;
  createFileWithPath(path);
  await fs.promises.writeFile(path, content);
  console.log("写入成功!!");
};

async function serialLoopRequests(arr) {
  let result = "";
  for (const item of arr) {
    const res = await perfectSubtitle(item);
    result += res + "\n";
  }
  return result;
}
