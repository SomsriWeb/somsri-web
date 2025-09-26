import type { Meta, StoryObj } from '@storybook/vue3';
import MaskHeader from './MaskHeader.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/MaskHeader',
	component: MaskHeader,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof MaskHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaskHeaderStory: Story = {
	args: {
		
	},
};
