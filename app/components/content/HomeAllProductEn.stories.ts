import type { Meta, StoryObj } from '@storybook/vue3';
import HomeAllProductEn from './HomeAllProductEn.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/HomeAllProductEn',
	component: HomeAllProductEn,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof HomeAllProductEn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeAllProductEnStory: Story = {
	args: {
  },
};
