// [======== project inference ========]
export class ProjectField {
    type: string;
    title: string;
    name: string;
    message?: string;
    style?: object;
    alt?: string;
    help?: string = '';
    validations?: object;
};

export class ProjectForm {
    form: ProjectField[];
    submitButton: string;
};

interface ProjectInferenceReceived {
    image_output?: {image: string, style: object};
    json_output?: string|object;
}

export interface ProjectInferenceResponse {
    result: string;
    message: string;
    received: ProjectInferenceReceived;
};

// [======== articles ========]
interface ArticleReceived {
    metaDescription: string;
    content: string;
    has_project: boolean;
    has_deployed: boolean;
    tags: Array<string>;
    framework: string;
    minutes: number;
};

export interface ArticleResponse {
    result: string;
    message: string;
    received: ArticleReceived;
};

export interface ArticlesReceived {
    date: number;
    tags: string[];
    framework: string;
    wall: string;
    title: string;
    description: string;
    minutes: number;
};

export interface ArticlesResponse {
    result: string;
    message: string;
    received: ArticlesReceived[];
};

export interface SubscriptionResponse {
    result: string;
    message: string;
}

export interface UnsubscriptionResponse {
    result: string;
    message: string;
    alreadyLeaved: boolean;
}

export interface MessageResponse {
    result: string;
    message: string;
}

// [======== editor js ========]
class EditorField {
    type: string;
    data = new Array();
};

export interface EditorData {
    time: number,
    blocks: EditorField[],
    version: string
};