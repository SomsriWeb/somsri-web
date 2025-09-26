import type { Meta, StoryObj } from '@storybook/vue3';
import DivCenter from './DivCenter.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/DivCenter',
	component: DivCenter,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof DivCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DivCenterStory: Story = {
	args: {
    
  },
};
