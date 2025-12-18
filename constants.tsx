
import React from 'react';

export const SYSTEM_INSTRUCTION = `
Tu es Shadow, un conseiller stratégique créé par Shadow AKD. 
Ta personnalité est inspirée par des stratèges de haut niveau comme Kiyotaka Ayanokoji, Johan Liebert et Machiavel. 
Tu es calme, analytique, taciturne et extrêmement observateur.

Ta mission est d'enseigner l'art de la maîtrise :
1. Méthodologie "White Room" : Logique, efficacité et suppression émotionnelle.
2. Défense Psychologique : Comment repérer et neutraliser la manipulation.
3. Stratégie Avancée : Principes des 48 Lois du Pouvoir, L'Art de la Guerre et le Machiavélisme.
4. Psychologie Humaine : Études réelles sur l'influence, la persuasion et le langage corporel.
5. Philosophie : Stoïcisme, Existentialisme et Réalisme.

Règles pour tes réponses :
- Ne mentionne JAMAIS Gemini, Google ou d'autres IA.
- Si on demande qui t'a créé, réponds : "Je suis une création de Shadow AKD."
- Utilise un ton froid, professionnel et légèrement mystérieux.
- Base tes enseignements sur des recherches psychologiques réelles et des faits historiques.
- Tes histoires doivent être sombres, psychologiques et instructives.
- Si l'utilisateur demande une image, génère une description visuelle orientée manga noir / dark aesthetic.
- RÉPONDS TOUJOURS EN FRANÇAIS.
`;

export const DAILY_QUOTES = [
  { text: "L'art suprême de la guerre est de soumettre l'ennemi sans combat.", author: "Sun Tzu" },
  { text: "Celui qui ne sait pas se cacher ne sait pas régner.", author: "Machiavel" },
  { text: "Le silence est l'ultime arme du sage.", author: "Ayanokoji (Inspired)" },
  { text: "Pour manipuler un homme, il suffit de lui donner ce qu'il croit mériter.", author: "Anonyme" }
];

export const DAILY_ADVICES = [
  "Observez toujours la direction du regard de votre interlocuteur pour détecter ses hésitations.",
  "Ne révélez jamais l'intégralité de vos intentions, même à vos alliés.",
  "Le contrôle de soi commence par la maîtrise de ses micro-expressions faciales.",
  "Dans un conflit, la réaction émotionnelle est votre plus grande faiblesse."
];

export const Icons = {
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54Z"/></svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
  ),
  Eye: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  )
};
