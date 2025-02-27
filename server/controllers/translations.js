const axios = require('axios');

module.exports.translate = async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const apiKey = process.env.DEEP_L_API_KEY;
    const url = 'https://api-free.deepl.com/v2/translate';

    const response = await axios.post(url, {
      text: [text],
      target_lang: targetLang
    }, {
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};