import type { Meta, StoryObj } from '@storybook/vue3';
import HowToOrder from './HowToOrder.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/HowToOrder',
	component: HowToOrder,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof HowToOrder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HowToOrderStory: Story = {
	args: {
	titleAsTag: 'h1'
  },
};
