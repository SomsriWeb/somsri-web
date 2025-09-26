import type { Meta, StoryObj } from '@storybook/vue3';
import Design from './Design.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/Design',
	component: Design,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Design>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesignStory: Story = {
	args: {
    
  },
};
