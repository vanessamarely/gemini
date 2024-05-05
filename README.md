# Guía Text Prompt

- Creación del Proyecto

Vamos a crear un proyecto de React con Vite, usando el siguiente codigo:

```
npm create vite@latest mi-app-generativa -- --template react
```

Accede al directorio del proyecto:

```
cd mi-app-generativa
```

Instala las dependencias:

```
 npm install
```

Agreguemos la librería

```
npm install @google/generative-ai
```

Ejecutamos nuestra app

```
npm run dev
```

- Configuración de la Aplicación React

Crearemos un componente en una carpeta components en el src de nuestro proyecto que llamaremos TextPrompt.jsx .

Importa React y los hooks necesarios:

```
import React, { useState } from 'react';
```

Define el componente TextPrompt:

```
const TextPrompt = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    // Aquí invocarás la API de generación de texto
  };

  return (
    <div>
      <input type="text" value={input} placeholder="Enter your prompt here..." onChange={handleInputChange} />
      <button onClick={handleSubmit}>Generar</button>
      {output && <p>{output}</p>}
    </div>
  );
};

export default TextPrompt;
```

- Integración de la api @google/generative-ai

Previo a la integración te recomiendo que accedas a https://aistudio.google.com/ y generes un API key.

Si ya tienes uno que hayas generado, puedes usarlo o crear una nueva.

Lo ideal es que no compartas tu API key en proyectos públicos.

Importa la librería@google/generative-ai.

```
import { GoogleGenerativeAI } from "@google/generative-ai";
```

Incluye una constante con tu APi key.

```
const apiKey = import.meta.env.VITE_API_KEY;
```

Crea u archivo en la raiz de tu proyecto llamado .env en el crea la variable de ambiente que debe iniciar con la palabra VITE, seguida del nombre que le pongas a tu API Key, en este caso API_KEY.

Crea una constante instanciando de la librería GoogleGenerativeAI, pasándole tu API key.

```
const genAI = new GoogleGenerativeAI(apiKey);
```

Crea una constante modelo, asignándole el nombre de tu modelo si ya tienes un previamente creado o añade el modelo de gemini.

```
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

En el handleSubmit vamos a hacer una petición al modelo para obtener el texto generado por el prompt que estamos ingresando.

```
 const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await model.generateContent(output);
    const response = await result.response;
    setOutput(response.text());
  };
```

Nota: Este paso puede tener muchas variaciones dependiendo del modelo a usar, si es uno creado personalizado o uno por defecto del https://aistudio.google.com/.

- Incluir el componente en el App
  
Incluye el componente TextPrompt en App.js.

```
import TextPrompt from './components/TextPrompt.jsx'

function App() {

  return (
    <>
      <h1>Text Prompt Demo</h1>
      <TextPrompt />
    </>
  );
```

Probar la Aplicación

Abre tu navegador y ve a ka url que te genera Vite, para ver tu aplicación en acción.



# Stack

React + Vite + Gemini

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
