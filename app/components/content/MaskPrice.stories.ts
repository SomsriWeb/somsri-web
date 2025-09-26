import type { Meta, StoryObj } from '@storybook/vue3';
import MaskPrice from './MaskPrice.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/MaskPrice',
	component: MaskPrice,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof MaskPrice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaskPriceStory: Story = {
	args: {
		
	},
};
