import type { Meta, StoryObj } from '@storybook/vue3';
import PantFabric from './PantFabric.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PantFabric',
    component: PantFabric,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PantFabric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PantFabricStory: Story = {
    args: {},
};
