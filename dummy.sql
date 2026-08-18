INSERT INTO documents (
    source,
    "original_filename",
    content,
    decisions,
    "action_items",
    "created_at",
    "updated_at"
)
VALUES

(
'meeting',
'engineering-sync-01.md',
'The engineering team discussed PostgreSQL versus MySQL. The team decided to use PostgreSQL because the schema is expected to evolve rapidly. Redis will be used for caching user sessions. John will prepare the migration plan.',
'[{"decision":"Use PostgreSQL","reason":"Flexible schema evolution","status":"active"}]'::jsonb,
'[{"task":"Prepare migration plan","owner":"John","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'architecture-review.md',
'The team reviewed Docker deployment. It was agreed that every service should run inside Docker containers. Kubernetes adoption was postponed until production scale increases.',
'[{"decision":"Run services using Docker","status":"active"}]'::jsonb,
'[{"task":"Create Dockerfiles","owner":"Alice","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'redis-design.md',
'Redis caching strategy was finalized. The team approved caching user profiles and session data. Cache expiration will be fifteen minutes.',
'[{"decision":"Adopt Redis caching","status":"active"}]'::jsonb,
'[{"task":"Implement Redis cache","owner":"Rahul","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'security-meeting.md',
'Authentication strategy was discussed. JWT tokens will be used. Refresh tokens should expire after thirty days.',
'[{"decision":"Use JWT authentication","status":"active"}]'::jsonb,
'[{"task":"Implement refresh tokens","owner":"Neha","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'payment-module.md',
'Stripe was selected as the payment gateway. PayPal support will remain for legacy customers.',
'[{"decision":"Use Stripe for new payments","status":"active"}]'::jsonb,
'[{"task":"Integrate Stripe","owner":"Amit","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'logging-discussion.md',
'Centralized logging was discussed. Elasticsearch and Kibana will be introduced for log analysis.',
'[{"decision":"Adopt ELK stack","status":"active"}]'::jsonb,
'[{"task":"Deploy Elasticsearch","owner":"David","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'monitoring.md',
'The team agreed to use Prometheus and Grafana for monitoring. Alert rules will be configured for CPU and memory usage.',
'[{"decision":"Use Prometheus and Grafana","status":"active"}]'::jsonb,
'[{"task":"Configure alerts","owner":"Priya","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'sprint-planning.md',
'Feature flags will be introduced before the next release. Every risky feature should be hidden behind a flag.',
'[{"decision":"Introduce feature flags","status":"active"}]'::jsonb,
'[{"task":"Evaluate LaunchDarkly","owner":"Rohit","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'ai-memory.md',
'The team discussed semantic search. Vector embeddings will not be introduced during MVP. Keyword search is sufficient for the first release.',
'[{"decision":"Delay vector search","reason":"Focus on MVP","status":"active"}]'::jsonb,
'[{"task":"Improve keyword search","owner":"Shibin","status":"pending"}]'::jsonb,
NOW(),
NOW()
),

(
'meeting',
'incident-review.md',
'An outage occurred because database connections were exhausted. Connection pooling should be enabled. Monitoring should include database metrics.',
'[{"decision":"Enable connection pooling","status":"active"}]'::jsonb,
'[{"task":"Tune PostgreSQL pool size","owner":"Suresh","status":"pending"}]'::jsonb,
NOW(),
NOW()
);

TRUNCATE TABLE memories, documents RESTART IDENTITY CASCADE;



CREATE EXTENSION IF NOT EXISTS vector;

SELECT extname, extversion
FROM pg_extension
WHERE extname = 'vector';


ALTER TABLE memories ADD COLUMN embedding vector(1024);