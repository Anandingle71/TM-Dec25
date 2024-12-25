import { ContentGenerationService } from '../../services/content-generation/service';
import { searchEducationalVideo } from '../../services/content-generation/video-search';
import type { LessonPlanFormData } from '../../../types/forms';

export async function generateLessonPlan(data: LessonPlanFormData & {
  topic: string;
  subject: string;
  grade: string;
}): Promise<string> {
  // Search for a relevant educational video
  const video = await searchEducationalVideo(
    `${data.subject} ${data.grade} ${data.topic}`
  );

  const prompt = `Create a lesson plan for ${data.subject} Grade ${data.grade}, Topic: ${data.topic}
Duration: ${data.duration}
Learning Styles: ${data.learningStyles.join(', ')}
Objectives: ${data.objectives}

Structure:
1. Learning objectives
2. Required materials
3. Introduction/Hook (5-10% of time)
4. Main activities incorporating VAK styles
5. Assessment strategies
6. Closure/Reflection
7. Extensions/Homework

${video ? `\nRecommended Video Resource:\nTitle: ${video.title}\nDuration: ${video.duration}\nURL: ${video.url}\n` : ''}

Additional: ${data.additionalInstructions}`;

  return ContentGenerationService.generate(prompt, {
    maxTokens: 2000,
    temperature: 0.7
  });
}