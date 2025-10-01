import type { Meta, StoryObj } from '@storybook/vue3';
import LandingPageHeaderStyleFour from './LandingPageHeaderStyleFour.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/LandingPageHeaderStyleFour',
	component: LandingPageHeaderStyleFour,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof LandingPageHeaderStyleFour>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingPageHeaderStyleFourStory: Story = {
	args: {
	 image: '', 
	 titleAsTag: 'h1',
  },
};
