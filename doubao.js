const fs = require("fs");
const Base64 = require("./base64.js");
const { createFileWithPath } = require("./utils.js");

exports.perfectSubtitle = async (subTitle, title) => {
  const text = "你是一名语文老师请添加标点符号:" + subTitle;

  const payload = JSON.stringify({
    event_type: 1,
    message: {
      conversation_id: "0",
      section_id: "0",
      local_message_id: "0dcd05c2-639d-4838-8f08-789976488960",
      content_type: 1,
      content: JSON.stringify({ text }),
      reply_id: "",
      ext: {
        stream: "1",
        answer_with_suggest: "0",
        flag_browser_plugin: "1",
        browser_language: "zh",
        browser_plugin_info:
          '{"skill_name":"rewrite","template_type":"tone","tone":"正式的"}',
      },
      local_conversation_id: "0",
      bot_id: "7338286299411103781",
    },
  });

  const prams = {
    headers: {
      accept: "text/event-stream",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-US;q=0.6",
      "content-type": "application/json",
      priority: "u=1, i",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "none",
      cookie:
        "d_ticket=5ebf5141bd3c6769f48fe22201b182fdef147; n_mh=27KiXgMkFoZT-cQbKMmHkYV6LeZ8A9e-mlp0zGLxx6U; store-region=cn-sh; store-region-src=uid; s_v_web_id=verify_m0ken4xp_e2HelBMw_P5KH_4bCV_8JOv_PmiqEEP4NarM; passport_csrf_token=a986eb38f54aefb85f301001b4c47998; passport_csrf_token_default=a986eb38f54aefb85f301001b4c47998; passport_mfa_token=CjiCm0ftKcgDcyb7%2FkPklW4tb1J4n1HHlxMqT8RfZi72PxNyPv2x17CMfemKbchQBseAKubzkPCHARpKCjxESxasnmZp38i2DQq2w1vvQ8i5IBGP36xMHeo2RwOgRB27fSsiukXk9sl95PqAcxJ9B9iVW0Ekem03z00Qsv%2FaDRj2sdFsIAIiAQNe1Z1i; odin_tt=c4c0680b8d70116011da073a36a1f73e83d9951d4b83135e09917454596699a48c513a3291275d132ca896809cfc097f1291e97a701fe4bf99e54f8cba2cde2b; sid_guard=d336137b1374a3709b485612ba1f880b%7C1725245581%7C5184000%7CFri%2C+01-Nov-2024+02%3A53%3A01+GMT; uid_tt=3aa4d438e4e3ee6dee0035d2481f70fa; uid_tt_ss=3aa4d438e4e3ee6dee0035d2481f70fa; sid_tt=d336137b1374a3709b485612ba1f880b; sessionid=d336137b1374a3709b485612ba1f880b; sessionid_ss=d336137b1374a3709b485612ba1f880b; is_staff_user=false; sid_ucp_v1=1.0.0-KGIxYjUzMmQ5MmYzMWQyYjMzMzZiMzkyNDg5ODRiNjZkZTZmYTExOTEKIAiMwvD60s2KBRCN0dS2Bhjw6CMgDDDa7suuBjgCQPEHGgJscSIgZDMzNjEzN2IxMzc0YTM3MDliNDg1NjEyYmExZjg4MGI; ssid_ucp_v1=1.0.0-KGIxYjUzMmQ5MmYzMWQyYjMzMzZiMzkyNDg5ODRiNjZkZTZmYTExOTEKIAiMwvD60s2KBRCN0dS2Bhjw6CMgDDDa7suuBjgCQPEHGgJscSIgZDMzNjEzN2IxMzc0YTM3MDliNDg1NjEyYmExZjg4MGI; ttwid=1%7CnyeBrnwMca5xPGjSa9RoZ3VaD7K9ZjgMnZ5dEiHfIJs%7C1730272775%7C82c3a655de37cf36c62dd4bdde79c4813799883d3ad9288cb0065b2f4a6c16fd",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify({
      payload: Base64.btoa(Base64.utob(payload)),
    }),
    method: "POST",
  };

  const res = await fetch(
    "https://www.doubao.com/alice/message/stream_call_bot?version=1.13.2&version_code=20650&language=zh&browser_language=zh-CN&device_platform=web&aid=586864&pkg_type=release_version&device_id=7377217223036782134&web_id=0&is_new_user=0&region=CN&sys_region=CN&use-olympus-account=1&samantha_web=1&real_aid=586864",
    prams
  );

  const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();
  const path = `/Users/changqing/Desktop/subtitle/scripts/${title}.docx`;

  createFileWithPath(path);
  let resultText = "";

  while (reader) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const dataBlocks = value.split("data:");
    // 将 str 写入 /Users/changqing/Desktop 目录下  txt 文件
    // await fs.promises.mkdir(dir, { recursive: true });
    try {
      resultText = JSON.parse(dataBlocks[1]).message.tts_content;
      console.log("正在重写!!");
    } catch (error) {}
  }
  await fs.promises.writeFile(path, resultText);
  console.log("写入成功!!");
};
