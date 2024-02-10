# CONTRIBUTING

Contributions are always welcome, no matter how large or small.

Some thoughts to help you contribute to this project

## Recommended Communication Style

1. Always leave screenshots for visuals changes
1. Always leave a detailed description in the Pull Request. Leave nothing ambiguous for the reviewer.
1. Always review your code first. Do this by leaving comments in your coding noting questions, or interesting things for the reviewer.
1. Always communicate. Whether it is in the issue or the pull request, keeping the lines of communication helps everyone around you.

## Setup (forks are preferred).

```sh
$ git clone https://github.com/<your-name>/projectx
$ cd projectx
$ pnpm i
```

## Building

```sh
$ pnpm run build
```

## Pull Requests

### _We actively welcome your pull requests, however linking your work to an existing issue is preferred._

1. Fork the repo and create your branch
2. Name your branch something that is descriptive to the work you are doing. i.e. adds-new-thing or fixes-mobile
3. Make sure you address any lint warnings.
4. Run `pnpm run format` if your unsure
5. If you make the existing code better, please let us know in your PR description.
6. A PR description and title are required. The title is required to begin with: "feat:" or "fix:"
7. [Link to an issue](https://help.github.com/en/github/writing-on-github/autolinked-references-and-urls) in the project. Unsolicited code is welcomed, but an issue is required for announce your intentions. PR's without a linked issue will be marked invalid and closed.

_note for maintainers: All pull requests need a label to assist automation. See the [template](https://github.com/meglerhagen/projectx/blob/HEAD/.github/release-drafter.yml) to guide which labels to use._

### PR Validation

Examples for valid PR titles:

- fix: Correct typo.
- feat: Add support for Node 12.
- refactor!: Drop support for Node 6.

_Note that since PR titles only have a single line, you have to use the ! syntax for breaking changes._

See [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more examples.

### Work in progress

GitHub has support for draft pull requests, which will disable the merge button until the PR is marked as ready for merge.

## Issues

If you plan to contribute a change based on an open issue, please assign yourself by commenting on the following word `.take`. Issues that are not assigned are assumed open, and to avoid conflicts, please assign yourself before beginning work on any issues.

If you would like to contribute to the project for the first time, please consider joining checking the [bug](https://github.com/meglerhagen/projectx/issues?q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%90%9B+bug%22) or [good first issue](https://github.com/meglerhagen/projectx/issues?q=is%3Aissue+is%3Aopen+label%3A%22Good+first+issue%22) labels.

Also, all questions are welcomed.

## Community

Do you have questions? Join the conversation in our [Discord](https://discord.gg/yZV8kY3ZAT).

## License

ProjectX is open-source under the GNU Affero General Public License Version 3 (AGPLv3) or any later version.
