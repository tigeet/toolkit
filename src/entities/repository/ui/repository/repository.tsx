import { memo } from "react";
import { cn } from "@bem-react/classname";
import GithubIcon from "@shared/assets/github.svg?react";
import { Link, Stars, UpdatedAt, Dot } from "@shared/ui/";

import "./repository.scss";
const cl = cn("repository");

type Props = {
  name: string;
  stars: number;
  updatedAt: Date;
  owner: string;
  url: string;
};

export const Repository = memo(
  ({ name, stars, owner, updatedAt, url }: Props) => {
    return (
      <div className={cl()}>
        <div className={cl("info")}>
          <Link to={`/${owner}/${name}`}>
            <h3 className={cl("title")}>{name}</h3>
          </Link>
          <ul className={cl("stats")}>
            <li className={cl("updatedAt")}>
              <UpdatedAt date={updatedAt} />
            </li>
            <Dot />
            <li className={cl("stars")}>
              <Stars count={stars} />
            </li>
          </ul>
        </div>

        <div>
          <Link className={cl("githubLink")} to={url} target="_blank">
            <GithubIcon className={cl("githubIcon")} />
          </Link>
        </div>
      </div>
    );
  }
);
