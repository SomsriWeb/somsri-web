import type { Meta, StoryObj } from '@storybook/vue3';
import SomsriProduceFor from './SomsriProduceFor.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/SomsriProduceFor',
    component: SomsriProduceFor,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof SomsriProduceFor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SomsriProduceForStory: Story = {
    args: {},
};
