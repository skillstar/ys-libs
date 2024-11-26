export interface APITypes {
    comments:     number;
    comments_url: string;
    commits_url:  string;
    created_at:   Date;
    description:  string;
    files:        Files;
    forks_url:    string;
    git_pull_url: string;
    git_push_url: string;
    html_url:     string;
    id:           string;
    node_id:      string;
    owner:        Owner;
    public:       boolean;
    truncated:    boolean;
    updated_at:   Date;
    url:          string;
    user:         null;
}

export interface Files {
    "custom-hook-boilerplate": CustomHookBoilerplate;
}

export interface CustomHookBoilerplate {
    filename: string;
    language: null;
    raw_url:  string;
    size:     number;
    type:     string;
}

export interface Owner {
    avatar_url:          string;
    events_url:          string;
    followers_url:       string;
    following_url:       string;
    gists_url:           string;
    gravatar_id:         string;
    html_url:            string;
    id:                  number;
    login:               string;
    node_id:             string;
    organizations_url:   string;
    received_events_url: string;
    repos_url:           string;
    site_admin:          boolean;
    starred_url:         string;
    subscriptions_url:   string;
    type:                string;
    url:                 string;
    user_view_type:      string;
}
