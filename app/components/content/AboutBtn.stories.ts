import type { Meta, StoryObj } from '@storybook/vue3';
import AboutBtn from './AboutBtn.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/AboutBtn',
    component: AboutBtn,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof AboutBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AboutBtnStory: Story = {
    args: {
        actionLink: '',
    },
};
