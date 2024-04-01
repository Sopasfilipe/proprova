const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai'); // Certifique-se de instalar a biblioteca openai via npm

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const gpt = new openai.OpenAIApi(process.env.OPENAI_API_KEY);

app.post('/generate-exercise', async (req, res) => {
  const { topic } = req.body;
  
  // Lógica para gerar o exercício usando a API do GPT-3
  try {
    const response = await gpt.complete({
      engine: 'text-davinci-002',
      prompt: `Generate a multiple choice exercise about ${topic}.`,
      maxTokens: 150,
      n: 1,
      stop: ['\n']
    });

    const exercise = response.choices[0].text.trim();
    res.send(exercise);
  } catch (error) {
    console.error('Error generating exercise:', error);
    res.status(500).send('Error generating exercise');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
