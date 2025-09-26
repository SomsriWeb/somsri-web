import type { Meta, StoryObj } from '@storybook/vue3';
import LandingPageHeaderStyleTwo from './LandingPageHeaderStyleTwo.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/LandingPageHeaderStyleTwo',
	component: LandingPageHeaderStyleTwo,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof LandingPageHeaderStyleTwo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingPageHeaderStyleTwoStory: Story = {
	args: {
	 image: '', 
	 titleAsTag: 'h1',
  },
};
