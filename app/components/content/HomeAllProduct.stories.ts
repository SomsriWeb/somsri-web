import type { Meta, StoryObj } from '@storybook/vue3';
import HomeAllProduct from './HomeAllProduct.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/HomeAllProduct',
	component: HomeAllProduct,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof HomeAllProduct>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeAllProductStory: Story = {
	args: {
    lang: 'en',
  },
};
