import { v4 as uuid } from 'uuid';

import { Snippet } from './snippet.model';

export const testSnippets: Snippet[] = [
  {
    id: uuid(),
    text: 'The sun sets slowly behind the mountain, casting a warm golden glow over the serene valley. Birds chirp softly, and a gentle breeze carries the scent of wildflowers, inviting peace and reflection for all who witness this tranquil scene.',
    summary:
      'Sun sets behind mountain, casting golden glow over valley with birds and breeze.',
  },
  {
    id: uuid(),
    text: 'Artificial intelligence is revolutionizing industries by automating complex tasks, analyzing vast datasets, and enhancing decision-making processes. Companies leverage AI to improve efficiency, reduce costs, and deliver personalized customer experiences across various sectors.',
    summary:
      'AI automates tasks, analyzes data, and enhances decisions, improving efficiency and personalization.',
  },
  {
    id: uuid(),
    text: 'A recent study shows that regular exercise significantly improves mental health, boosts mood, and reduces stress. Activities like yoga and running promote mindfulness, increase endorphins, and enhance overall well-being in daily life.',
    summary:
      'Regular exercise boosts mental health, mood, and reduces stress through mindfulness.',
  },
  {
    id: uuid(),
    text: 'The company launched a new product line focused on sustainable materials and eco-friendly packaging. This initiative aims to attract environmentally conscious consumers and reduce the ecological footprint of their operations significantly.',
    summary:
      'Company launches sustainable product line with eco-friendly packaging for conscious consumers.',
  },
  {
    id: uuid(),
    text: 'Learning to code opens doors to countless opportunities in technology. It fosters creativity, enhances problem-solving skills, and empowers individuals to build innovative solutions that shape the future of digital ecosystems.',
    summary:
      'Coding opens tech opportunities, fostering creativity and problem-solving skills.',
  },
];
