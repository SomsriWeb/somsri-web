import type { Meta, StoryObj } from '@storybook/vue3';
import SportImgStyle from './SportImgStyle.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/SportImgStyle',
    component: SportImgStyle,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof SportImgStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SportImgStyleStory: Story = {
    args: {},
};
