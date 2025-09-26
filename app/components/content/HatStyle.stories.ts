import type { Meta, StoryObj } from '@storybook/vue3';
import HatStyle from './HatStyle.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/HatStyle',
	component: HatStyle,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof HatStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HatStyleStory: Story = {
	args: {
    
  },
};
