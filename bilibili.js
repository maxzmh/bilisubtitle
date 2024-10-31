const { perfectSubtitle } = require("./doubao");

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
          "header_theme_version=CLOSE; CURRENT_BLACKGAP=0; buvid4=0AB028BC-3595-F2FE-64DF-1B4E0191E7A508541-023080618-ZuhD6dxC%2BOIGrr71yHriqw%3D%3D; buvid_fp_plain=undefined; enable_web_push=DISABLE; DedeUserID=354922193; DedeUserID__ckMd5=b6112e5ef321d162; FEED_LIVE_VERSION=V_WATCHLATER_PIP_WINDOW3; buvid3=70FECEA9-6DAF-DD79-0EBF-BDB46D6BE2A688144infoc; b_nut=1723107488; _uuid=7CAD4105B-713C-BE6F-B1910-DC1733318910F89101infoc; CURRENT_QUALITY=80; rpdid=|(u|JRkukRkR0J'u~klk~u~|~; hit-dyn-v2=1; CURRENT_FNVAL=4048; fingerprint=6c232a9308194d40a82be608a3122c62; PVID=1; buvid_fp=6c232a9308194d40a82be608a3122c62; home_feed_column=5; SESSDATA=e9a70001%2C1745634925%2C4efba%2Aa2CjATRptnh8FCVilXxiDaCKdfMpOu0lfTFhFF4fpycQeSxfsBuL8_-FpdQ4hn8KcfJbgSVjdUbU5LZU15MmFyMUhKRnNrZlZzQUpBRXYyWGlIMWFCRzJzOWsyTm9rRzR1QjlfM3ZQTmhQRTlrZlhrNzBMMEZPLUVHZnhsRkhsSmswSjdqR2JWUXV3IIEC; bili_jct=6e768df9e8b239e89e2bae2a430258c4; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzAzNDY2NjYsImlhdCI6MTczMDA4NzQwNiwicGx0IjotMX0._nW4hWF4Fs8kAehS6ZfehqY2uazbSy_zZmUiDSlD-bg; bili_ticket_expires=1730346606; b_lsid=173A5F18_192DBB539F0; browser_resolution=1920-1088; bp_t_offset_354922193=993960839381778432; sid=ozuw8n58",
      },
      body: null,
      method: "GET",
    }
  ).then((res) => res.json());

  const url = data.subtitle.subtitles[0].subtitle_url;
  const { body } = await fetch(`https:${url}`, {
    method: "GET",
  }).then((res) => res.json());
  const str = body.map((i) => i.content).join(" ");
  await perfectSubtitle(str, title, name);
};
