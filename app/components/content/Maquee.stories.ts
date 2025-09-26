import type { Meta, StoryObj } from '@storybook/vue3';
import Maquee from './Maquee.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/Maquee',
	component: Maquee,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Maquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaqueeStory: Story = {
	args: {
		duration: 40,
	},
};
