import type { Meta, StoryObj } from '@storybook/vue3';
import OwnBrandHeader from './OwnBrandHeader.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/OwnBrandHeader',
	component: OwnBrandHeader,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof OwnBrandHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnBrandHeaderStory: Story = {
	args: {
		
	},
};
