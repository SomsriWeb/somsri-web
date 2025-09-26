import type { Meta, StoryObj } from '@storybook/vue3';
import LinkButton from './LinkButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/LinkButton',
	component: LinkButton,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkButtonStory: Story = {
	args: {
		to: '',
	},
};
