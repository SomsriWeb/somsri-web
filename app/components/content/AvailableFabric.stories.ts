import type { Meta, StoryObj } from '@storybook/vue3';
import AvailableFabric from './AvailableFabric.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/AvailableFabric',
    component: AvailableFabric,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof AvailableFabric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvailableFabricStory: Story = {
    args: {
        type: 'tshirt',
    },
};
