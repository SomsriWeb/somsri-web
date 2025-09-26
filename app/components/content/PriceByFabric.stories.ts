import type { Meta, StoryObj } from '@storybook/vue3';
import PriceByFabric from './PriceByFabric.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PriceByFabric',
    component: PriceByFabric,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PriceByFabric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PriceByFabricStory: Story = {
    args: {
        type: "tshirt"
    },
};
