import type { Meta, StoryObj } from '@storybook/vue3';
import AboutHeader from './AboutHeader.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/AboutHeader',
    component: AboutHeader,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof AboutHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AboutHeaderStory: Story = {
    args: {},
};
