import type { Meta, StoryObj } from '@storybook/vue3';
import DescriptionPills from './DescriptionPills.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/DescriptionPills',
	component: DescriptionPills,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof DescriptionPills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DescriptionPillsStory: Story = {
	args: {
    slot: 3,
    color: 'white',
  },
};
