import type { Meta, StoryObj } from '@storybook/vue3';
import FabricList from './FabricList.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/FabricList',
	component: FabricList,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof FabricList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FabricListStory: Story = {
	args: {
    
  },
};
