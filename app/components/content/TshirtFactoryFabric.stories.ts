import type { Meta, StoryObj } from '@storybook/vue3';
import TshirtFactoryFabric from './TshirtFactoryFabric.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/TshirtFactoryFabric',
    component: TshirtFactoryFabric,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof TshirtFactoryFabric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TshirtFactoryFabricStory: Story = {
    args: {},
};
