import type { Meta, StoryObj } from '@storybook/vue3';
import LandingPageHeaderStyleThree from './LandingPageHeaderStyleThree.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/LandingPageHeaderStyleThree',
	component: LandingPageHeaderStyleThree,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof LandingPageHeaderStyleThree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingPageHeaderStyleThreeStory: Story = {
	args: {
	 image: '', 
	 titleAsTag: 'h1',
  },
};
