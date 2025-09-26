import type { Meta, StoryObj } from '@storybook/vue3';
import LandingPageColorScreen from './LandingPageColorScreen.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/LandingPageColorScreen',
	component: LandingPageColorScreen,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof LandingPageColorScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingPageColorScreenStory: Story = {
	args: {
	
  },
};
