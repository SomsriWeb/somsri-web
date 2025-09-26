import type { Meta, StoryObj } from '@storybook/vue3';
import TshirtFactoryAboutSomsri from './TshirtFactoryAboutSomsri.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/TshirtFactoryAboutSomsri',
    component: TshirtFactoryAboutSomsri,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof TshirtFactoryAboutSomsri>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TshirtFactoryAboutSomsriStory: Story = {
    args: {},
};
