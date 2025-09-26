import type { Meta, StoryObj } from '@storybook/vue3';
import Sport from './Sport.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/Sport',
    component: Sport,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof Sport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SportStory: Story = {
    args: {},
};
