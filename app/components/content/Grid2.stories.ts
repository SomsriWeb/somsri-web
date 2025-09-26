import type { Meta, StoryObj } from '@storybook/vue3';
import Grid2 from './Grid2.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/Grid2',
	component: Grid2,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Grid2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid2Story: Story = {
	args: {
    
  },
};
