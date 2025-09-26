import type { Meta, StoryObj } from '@storybook/vue3';
import UniformDescription from './UniformDescription.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/UniformDescription',
    component: UniformDescription,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof UniformDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UniformDescriptionStory: Story = {
    args: {},
};
